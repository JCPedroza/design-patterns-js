const { expect } = require('chai');

const testSubjects = [
  require('./observer-class'),
  require('./observer-concat')
];

testSubjects.forEach(({ createSwitch, createLightbulb, id }) => {
  describe(`Observer pattern "${id}"`, () => {
    const subject = createSwitch();
    const observerA = createLightbulb();
    const observerB = createLightbulb();

    // Validate state of all involved actors.
    const checkState = (isOnS, notif, aggre, isOnA, updtA, isOnB, updtB) => {
      expect(subject.getIsOn()).to.equal(isOnS);
      expect(subject.getNotifyCount()).to.equal(notif);
      expect(subject.getObserversSize()).to.equal(aggre);

      expect(observerA.getIsOn()).to.equal(isOnA);
      expect(observerA.getUpdateCount()).to.equal(updtA);

      expect(observerB.getIsOn()).to.equal(isOnB);
      expect(observerB.getUpdateCount()).to.equal(updtB);
    };

    it('lets observers attach to subjects', () => {
      subject.attach(observerA);
      checkState(false, 0, 1, false, 0, false, 0);
    });

    it('lets subjects notify observers', () => {
      subject.toggle();
      checkState(true, 1, 1, true, 1, false, 0);
    });

    it('manages multiple observers', () => {
      subject.attach(observerB);
      subject.toggle();
      checkState(false, 3, 2, false, 2, false, 1);

      subject.toggle();
      checkState(true, 5, 2, true, 3, true, 2);
    });

    it('lets observers detach from subjects', () => {
      subject.detach(observerA);
      subject.toggle();
      checkState(false, 6, 1, true, 3, false, 3);

      subject.detach(observerB);
      subject.toggle();
      checkState(true, 6, 0, true, 3, false, 3);
    });
  });
});
