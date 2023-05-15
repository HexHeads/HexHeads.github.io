export default function wait(condition, time = 50) {
    return new Promise((resolve) => {
        const int = setInterval((() => {
            if (!condition()) return;

            clearInterval(int);
            resolve(true);
        }), time);
    });
}
