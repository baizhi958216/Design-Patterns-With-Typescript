# Builder Pattern

Separate the construction of a complex object from its representation so that the same construction process can create different representations.

Separate the process of creating a complex object from the client, and the product only needs to know what components are needed, not how these components are composed or what structure they have. The Builder pattern focuses on how to create these components step by step, and different builders define different creation processes.

The Builder pattern has four roles: `Abstract Builder`, `ConcreteBuilder`, `Product`, `Director`.
