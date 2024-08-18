import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Form({ children }: Props): React.JSX.Element {
  return <>{children}</>;
}
