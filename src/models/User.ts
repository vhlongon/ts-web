interface UserProps {
  name?: string;
  age?: number;
}

export const User = (data: UserProps) => ({
  get(propName: string): number | string {
    return data[propName];
  },
  set(update: UserProps): void {
    Object.assign(data, update);
  },
});
