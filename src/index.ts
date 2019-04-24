/**
 * node-simplecqrs is an attempt to formlize CQRS pattern
 * using Typesript. it's an unopinited package it provide
 * loosly coupled abstraction that you can use separated
 * from one another. node-simlecqrs is mainly composed of
 * interfaces for different cqrs parts like : ICommand for
 * command, IQuery for query, ICommandHandler for command
 * handler, IQueryHandler for query handler. The interfaces
 * are merly type markers (empty interface) to help orgnize
 * the code.
 * the ICommandDispatcher and IQueryDispatcher are
 * convinient classes when your are using some sort of DI
 * container it will help handling incoming queries or
 * commands using the right handler. An implementation of
 * command and query dispatcher is provided for inversifyjs.
 * other containers will be implemented.
 */

export { IMessage } from './common/message';
export { IDateMapper } from './common/datamapper';

export { IQuery } from './query/query';
export { IQueryHandler } from './query/queryhandler';
export { IQueryDispatcher } from './query/querydispatcher';

export { ICommand } from './command/command';
export { ICommandHandler } from './command/commandhandler';
export { ICommandDispatcher } from './command/commanddispatcher';

import * as Ioc from './ioc';
export { Ioc };
