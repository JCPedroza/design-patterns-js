const { expect } = require('chai');

const { Subject, Observer, id } = require('./observer-class');

describe(`Observer pattern "${id}"`, () => {
  const subject = new Subject();
  const observerA = new Observer();
  const observerB = new Observer();

  it('lets observers attach to subjects', () => {
    subject.attach(observerA);
    subject.attach(observerB);

    expect(subject.observers.size).to.equal(2);
  });

  it('lets subjects notify observers', () => {
    subject.notify();

    expect(subject.notifications).to.equal(2);
    expect(observerA.updates).to.equal(1);
    expect(observerB.updates).to.equal(1);
  });

  it('lets observers detach from subjects', () => {
    subject.detach(observerB);
    subject.notify();

    expect(subject.observers.size).to.equal(1);
    expect(subject.notifications).to.equal(3);
    expect(observerA.updates).to.equal(2);
    expect(observerB.updates).to.equal(1);
  });
});
