
export interface SecurityVerification{
	creation: string
	name: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Employee ID : Link - Employee	*/
	employee_id?: string
	/**	Series : Select	*/
	naming_series?: "SEC-.DD.MM.YY.-.####."
	/**	Employee Name : Data	*/
	employee_name?: string
	/**	Amended From : Link - Security Verification	*/
	amended_from?: string
	/**	Laptop Image : Attach	*/
	laptop_image?: string
	/**	Confiscated : Data	*/
	conf_list?: string
	/**	Returned : Data	*/
	returned_list?: string
	/**	Pending : Data	*/
	pending_list?: string
	/**	Confiscated Items : Long Text	*/
	image_list?: string
}