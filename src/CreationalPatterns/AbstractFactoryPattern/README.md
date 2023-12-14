# Abstract Factory Pattern

The abstract factory pattern provides an interface for creating a series of related or dependent objects without specifying their concrete classes.

Product hierarchy: This refers to the inheritance structure of products. For example, if an abstract class is a television, and its subclasses are Skyworth TV, Xiaomi TV, etc., then the abstract television and specific brand TVs form a product hierarchy. The abstract television is the parent class, while specific brand TVs are the subclasses.

Product family: A product family is a group of products produced by the same factory in the abstract factory pattern, located in different product hierarchies. For example, a Xiaomi factory produces Xiaomi TVs, Xiaomi phones, and Xiaomi computers. Xiaomi TV belongs to the television product hierarchy, Xiaomi phone belongs to the phone product hierarchy, and Xiaomi TV and Xiaomi phone together form a product family.

The factory method pattern is applicable to a single product hierarchy, while the abstract factory pattern deals with multiple product hierarchies. In the abstract factory pattern, each concrete factory provides multiple factory methods to generate various types of products, and these products together constitute a product family.

Therefore, the abstract factory pattern involves four roles: `Abstract Factory`, `Concrete Factory`, `Abstract Product`, and `Concrete Product`.
