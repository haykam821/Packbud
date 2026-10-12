import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

import styles from "./button.module.css";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
	return <button {...props} className={classNames(styles.main, props.className)} />;
}
