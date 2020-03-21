var BreakPoints = BreakPoints || {};

BreakPoints = {
  MajorBreakPoints: {
    A: 0,
    B: 1,
    C: 2,
    D: 3
  },
  currentMajorBreakPoint: () => {
    return window.innerWidth <= 580
      ? BreakPoints.MajorBreakPoints.A
      : window.innerWidth <= 768
        ? BreakPoints.MajorBreakPoints.B
        : window.innerWidth <= 1280
          ? BreakPoints.MajorBreakPoints.C
          : BreakPoints.MajorBreakPoints.D;
  }
};

// document.addEventListener('DOMContentLoaded', () => BreakPoints.currentMajorBreakPoint());
