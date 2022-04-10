const { expect } = require('chai');

const { createSwitch, createLightbulb, id } = require('./observer-class');

describe(`Observer pattern "${id}"`, () => {
  const subject = createSwitch();
  const observerA = createLightbulb();
  const observerB = createLightbulb();

  // Validate state of all involved actors.
  const checkState = (swtch, notif, aggre, isOnA, updtA, isOnB, updtB) => {
    expect(subject.switch).to.equal(swtch);
    expect(subject.notifications).to.equal(notif);
    expect(subject.aggregateCount).to.equal(aggre);

    expect(observerA.isOn).to.equal(isOnA);
    expect(observerA.updates).to.equal(updtA);

    expect(observerB.isOn).to.equal(isOnB);
    expect(observerB.updates).to.equal(updtB);
  };

  it('lets observers attach to subjects', () => {
    subject.attach(observerA);
    checkState(false, 0, 1, false, 0, false, 0);
  });

  it('lets subjects notify observers', () => {
    subject.toggleSwitch();
    checkState(true, 1, 1, true, 1, false, 0);
  });

  it('manages multiple observers', () => {
    subject.attach(observerB);
    subject.toggleSwitch();
    checkState(false, 3, 2, false, 2, false, 1);

    subject.toggleSwitch();
    checkState(true, 5, 2, true, 3, true, 2);
  });

  it('lets observers detach from subjects', () => {
    subject.detach(observerA);
    subject.toggleSwitch();
    checkState(false, 6, 1, true, 3, false, 3);

    subject.detach(observerB);
    subject.toggleSwitch();
    checkState(true, 6, 0, true, 3, false, 3);
  });
});
