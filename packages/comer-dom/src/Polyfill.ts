export const requestIdleCallback =
  window.requestIdleCallback ||
  ((handler: (deadline: IdleDeadline) => void): number => {
    const startTime = Date.now();
    return window.setTimeout(
      () =>
        handler({
          didTimeout: false,
          timeRemaining: () => Math.max(0, 50.0 - (Date.now() - startTime)),
        }),
      1,
    );
  });

export const cancelIdleCallback =
  window.cancelIdleCallback || ((id) => window.clearTimeout(id));
