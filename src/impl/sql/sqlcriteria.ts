import { ICriteria } from "../../read/criteria";

export interface ISqlCriteria extends ICriteria<string> {}

export class SqlCriteria implements ISqlCriteria {
  public static eq(filedName: string, value: string): SqlCriteria {
    return this.custom(filedName, value, "=");
  }
  public static lt(filedName: string, value: string): SqlCriteria {
    return this.custom(filedName, value, "<");
  }
  public static lte(filedName: string, value: string): SqlCriteria {
    return this.custom(filedName, value, "<=");
  }
  public static gt(filedName: string, value: string): SqlCriteria {
    return this.custom(filedName, value, ">");
  }
  public static gte(filedName: string, value: string): SqlCriteria {
    return this.custom(filedName, value, ">=");
  }
  public static like(filedName: string, value: string): SqlCriteria {
    return this.custom(filedName, value, "like");
  }
  public static in(filedName: string, value: string[]): SqlCriteria {
    return new SqlCriteria(`${filedName} in (${value.join(",")})`);
  }
  public static custom(filedName: string, value: string, operator: string) {
    return new SqlCriteria(`${filedName} ${operator} ${value}`);
  }
  private expression: string;
  private constructor(exp: string) {
    this.expression = exp;
  }
  public toExpression(): string {
    return this.expression;
  }
}
