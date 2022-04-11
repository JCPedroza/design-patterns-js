# Observer Pattern

Defines a one-to-many dependency between objects so that when one object
changes state, all its dependents are notified and updated automatically.

## Actors

### Subject interface

- `attach(observer)`: Register observer.
- `detach(observer)`: Unregister observer.
- `notify(observer)`: Call `update()` on all observers.

### Concrete subject

- Implements the Subject interface.
- Notifies observers when state changes.

### Observer interface

- `update(state)`: Action to perform when the subject changes state.

### Concrete observer

- Implements the Observer interface.
- Receives notifications from the subject.

## Diagrams

![UML class and sequence diagram for the observer pattern][20]

## Resources

- [Observer pattern at Wikipedia][50]
- [Observer pattern at Refactoring Guru][51]
- [Observer pattern at Microsoft][52]

## Bibliography

- Design Patterns - Gamma, Helm, Johnson, Vlissides (1st edition) page 293
- Head First Design Patterns - Freeman & Robson (2nd edition) page 37

[20]: https://en.wikipedia.org/wiki/Observer_pattern#/media/File:W3sDesign_Observer_Design_Pattern_UML.jpg

[50]: https://en.wikipedia.org/wiki/Observer_pattern
[51]: https://refactoring.guru/design-patterns/observer
[52]: https://docs.microsoft.com/en-us/dotnet/standard/events/observer-design-pattern
