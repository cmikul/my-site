<script lang="ts">
    import { onMount } from "svelte";
    import p5 from "p5";

    // A variable to hold the container div for our p5 sketch
    let container: HTMLDivElement;

    onMount(() => {
        // This function is the core of our p5 instance.
        // It takes one argument, which is the p5 instance itself.
        const sketch = (p: p5) => {
            // --- ALL YOUR P5 CODE GOES HERE, INSIDE THE SKETCH FUNCTION ---

            // Move all global variables inside the sketch function
            let bodies: Body[] = [];
            const G = 15.0; // Gravitational constant
            const e = 1.0; // Coefficient of elasticity
            let mouse: Mouse;

            // The Body class now lives inside the sketch function.
            // This gives it access to the p5 instance 'p'.
            // svelte-ignore perf_avoid_nested_class
            class Body {
                position: p5.Vector;
                velocity: p5.Vector;
                acceleration: p5.Vector;
                mass: number;
                diam: number;
                colora: number;
                colorb: number;
                trail: p5.Vector[];
                maxTrailLength: number;

                constructor() {
                    // Prefix p5 functions with 'p.'
                    this.position = p.createVector(p.width / 2, p.height / 2);
                    this.velocity = p.createVector(0, 0);
                    this.acceleration = p.createVector(0, 0);

                    this.mass = 1;
                    this.diam = this.mass * 20;

                    this.colora = 100;
                    this.colorb = 100;

                    this.trail = [];
                    this.maxTrailLength = 100;
                }

                init_cor_smooth(j: number, n: number) {
                    let R = 100; // base scale
                    let coeffs = [
                        { r: 1, amp: R },
                        { r: 1, amp: R },
                    ];

                    function curve(t: number) {
                        let x = 0,
                            y = 0;
                        for (let c of coeffs) {
                            let angle = p.TWO_PI * c.r * t;
                            x += c.amp * Math.cos(angle);
                            y += c.amp * Math.sin(angle);
                        }
                        return p.createVector(x, y);
                    }

                    function curveTangent(t: number) {
                        let dx = 0,
                            dy = 0;
                        for (let c of coeffs) {
                            let angle = 2 * Math.PI * c.r * t;
                            let factor = 2 * Math.PI * c.r;
                            dx += -c.amp * factor * Math.sin(angle);
                            dy += c.amp * factor * Math.cos(angle);
                        }
                        return p.createVector(dx, dy);
                    }

                    let t = j / n;
                    this.position = curve(t);
                    this.velocity = curveTangent(t);

                    let scale = 0.001;
                    this.velocity.mult(scale);
                }

                applyForce(force: p5.Vector) {
                    let f = force.copy().div(this.mass);
                    this.acceleration.add(f);
                }

                update() {
                    this.velocity.add(this.acceleration);
                    this.position.add(this.velocity);
                    this.acceleration.mult(0);

                    this.trail.push(this.position.copy());
                    if (this.trail.length > this.maxTrailLength) {
                        this.trail.shift();
                    }
                }

                show() {
                    p.fill(0, this.colora, this.colorb);
                    p.noStroke();
                    p.circle(this.position.x, this.position.y, this.diam);

                    p.noFill();
                    p.strokeWeight(2);
                    p.beginShape();
                    for (let i = 0; i < this.trail.length; i++) {
                        p.stroke(0, this.colora, this.colorb);
                        p.vertex(this.trail[i].x, this.trail[i].y);
                    }
                    p.endShape();
                }

                checkEdges() {
                    let halfWidth = p.width / 2;
                    let halfHeight = p.height / 2;
                    let radius = this.diam / 2;

                    if (
                        this.position.x > halfWidth - radius ||
                        this.position.x < -halfWidth + radius
                    ) {
                        this.velocity.x *= -1;
                    }
                    if (
                        this.position.y > halfHeight - radius ||
                        this.position.y < -halfHeight + radius
                    ) {
                        this.velocity.y *= -1;
                    }
                }

                attract(body: Body) {
                    let force = p5.Vector.sub(this.position, body.position);
                    let d = p.constrain(force.mag(), 10, 50);
                    let strength = (G * (this.mass * body.mass)) / (d * d);
                    force.setMag(strength);
                    body.applyForce(force);
                }

                checkCollision(body: Body) {
                    let normal = p5.Vector.sub(this.position, body.position);
                    let dist = normal.mag();

                    let radiusSum = this.diam / 2 + body.diam / 2;
                    if (dist >= radiusSum) return;

                    if (dist === 0) {
                        normal.set(p.random(0.01, 0.02), p.random(0.01, 0.02));
                        dist = normal.mag();
                    }
                    normal.div(dist);

                    let relVelocity = p5.Vector.sub(
                        this.velocity,
                        body.velocity,
                    );
                    let vnorm = relVelocity.dot(normal);

                    if (vnorm > 0) return;

                    let invMassSum = 1 / this.mass + 1 / body.mass;
                    let j = (-(1 + e) * vnorm) / invMassSum;

                    let impulse = normal.copy().mult(j);

                    this.velocity.add(impulse.copy().div(this.mass));
                    body.velocity.sub(impulse.copy().div(body.mass));

                    const percent = 0.8;
                    const slop = 0.01;
                    let correctionMag =
                        (Math.max(dist - radiusSum, -slop) / invMassSum) *
                        percent;
                    let correction = normal.copy().mult(correctionMag);
                    this.position.add(correction.copy().div(this.mass));
                    body.position.sub(correction.copy().div(body.mass));
                }
            }

            // svelte-ignore perf_avoid_nested_class
            class Mouse {
                position: p5.Vector;
                mass: number;

                constructor() {
                    this.position = p.createVector(
                        p.mouseX - p.width / 2,
                        p.mouseY - p.height / 2,
                    );
                    this.mass = 5;
                }

                attract(body: Body) {
                    let force = p5.Vector.sub(this.position, body.position);
                    let d = p.constrain(force.mag(), 10, 50);
                    let strength = (G * (this.mass * body.mass)) / (d * d);
                    force.setMag(strength);
                    body.applyForce(force);
                }

                update() {
                    this.position = p.createVector(
                        p.mouseX - p.width / 2,
                        p.mouseY - p.height / 2,
                    );
                }
            }

            // Replace global setup() with p.setup
            p.setup = () => {
                p.createCanvas(p.windowWidth, p.windowHeight);
                let n = 10;
                for (let i = 0; i < n; i++) {
                    let b = new Body();
                    b.mass = 0.5;
                    b.diam = b.mass * 40;
                    b.colora = p.random(70, 150);
                    b.colorb = p.random(70, 150);
                    b.init_cor_smooth(i, n);
                    bodies.push(b);
                }
                mouse = new Mouse();
            };

            // Replace global draw() with p.draw
            p.draw = () => {
                p.background("#020617");
                p.translate(p.width / 2, p.height / 2); // Center curve

                if (p.mouseIsPressed) {
                    for (let i = 0; i < bodies.length; i++) {
                        mouse.attract(bodies[i]);
                    }
                    mouse.update();
                }

                for (let i = 0; i < bodies.length; i++) {
                    for (let j = i + 1; j < bodies.length; j++) {
                        bodies[j].attract(bodies[i]);
                        bodies[i].attract(bodies[j]);
                        bodies[j].checkCollision(bodies[i]);
                    }
                    bodies[i].update();
                    bodies[i].checkEdges();
                    bodies[i].show();
                }
            };

            p.windowResized = () => {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };
        };

        // Create the p5 instance and attach it to the container div
        const p5Instance = new p5(sketch, container);

        // onMount can return a cleanup function
        return () => {
            // This is called when the component is unmounted
            p5Instance.remove();
        };
    });
</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->
<div bind:this={container} class="p5-container" />

<style>
    /* Make the container take up the full space */
    .p5-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
