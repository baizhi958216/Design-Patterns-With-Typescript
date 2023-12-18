# Prototype Pattern

The Prototype Pattern involves specifying the type of object to create by using a prototype instance and creating new objects by copying this prototype.

Instead of creating objects using a constructor, this pattern improves performance and reduces code duplication in situations where multiple similar objects need to be created.

The process begins with the creation of a prototype object, and new objects are then created by copying this prototype. The initial state of the new object is obtained by cloning the prototype object, which contains the properties and methods to be copied.

Therefore, the Prototype Pattern consists of three roles: `Abstract Prototype Class`, `Concrete Prototype Class`, and `Client Class`.
