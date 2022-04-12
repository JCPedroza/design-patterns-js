# Singleton Pattern

Ensure a class only has one instance, and provide a global access point
to it.

This can be achieved through a private constructor and a public method that
invokes the constructor if an instance hasn't been created yet, or returns
the instance if it has been already created.

JS doesn't have private constructors, but we can control what we return from
the constructor (in contrast with Java, where you can't explicitly return
something in constructors). The constructor can return the instance if it
already exists, or initialize a new isntance if none exists.

That way there is no need to use a factory function, since using the
constructor will always return a reference to the same instance. This is not
expected behavior, so including a factory function for the singleton is still
a good idea.

## Actors

### Class with only one instance

- There should be no way to create more than one instance.

### Factory function / method

- Provides the global access point to the singleton.

## Bibliography

- Design Patterns - Gamma, Helm, Johnson, Vlissides (1st edition) page 127
- Head First Design Patterns - Freeman & Robson (2nd edition) page 169
