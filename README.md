# Simple CQRS for NodeJS

this package is a set of Typescript interfaces that aim to represent the CQRS pattern as simply as possible.
Other packages will be developped on top of this abstraction to represent CQRS specific to some domains.

## Documentation:

this package is subdivied to 3 folders : common, read, and write. As you can guess read and write correspond to the CQ of CQRS, command (write), query (read). common includes a DataMapper interface which represent the mapping of store entites to domain entites. Its use is optional.

### Read (Query):

- ICriteria: used to represent any search criterias.
- IQuery: query specific to some store (ex.: SQL query when the store is RDBMS).
- IQueryHandler: encapsulate all related to the persistance infrastructure and handle IQuery.
- IQueryDispatcher: given IQuery, it will dispatch it to the adequate IQueryHandler.

A typical usage of this abstraction in case of a users database is : a client want to get all the personal fo IA departement. the client will create a ICriteria to select users of IA department. the ICriteria will be then passed to the select all personal IQuery for filtering. The IQuery will be then passed to IQueryDispatcher which will handle it using the right IQueryHandler and return the result set to the user.

### Write (Command):

- ICommand: represent a command for the system.
- ICommandHandler: will handle ICommand(s), here all of your business logic will reside.
- ICommandDispatcher: given a ICommand, it will dispatch it to the right ICommandHandler.

A typical usage ot this abstractio in case of a users database is: a client want to update a user firstname. the client will create an ICommand for updating user firstname, this ICommand is passed to ICommandDispatcher which will handle it using the right ICommandHandler which will handle the ICommand according to the business rules.
