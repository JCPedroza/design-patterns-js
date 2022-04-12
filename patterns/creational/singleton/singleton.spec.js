const { expect } = require('chai');

const testSubjects = [
  require('./singleton-class'),
  require('./singleton-literal')
];

const numOfRefs = 3;

testSubjects.forEach(({ createGlobalCounter, id }) => {
  describe(`Singleton pattern "${id}"`, () => {
    const counts = Array(numOfRefs).map(_ => createGlobalCounter());

    it('creates references that point to the same instance', () => {
      counts.forEach((count, index) => {
        expect(count).to.equal(counts[(index + 1) % counts.length]);
      });
    });

    it('interactions with all references affect the same instance', () => {
      counts.forEach(count => count.tick());

      counts.forEach(count =>
        expect(count.getTicks()).to.equal(counts.length));
    });
  });
});
