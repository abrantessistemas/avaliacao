export class BadRequestContract {
  data!: string;
  error!: { error: string, data: any };
  message!: string;
  name!: string;
  status!: number;
  statusText!: string;
  url!: string;
}
