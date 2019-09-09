export interface MathTasksType {
  id: number;
  firstNumber: number;
  secondNumber: number;
  expressionResult: number;
  userReply: undefined | number | string;
  operator: string;
  status: undefined | boolean;
}
