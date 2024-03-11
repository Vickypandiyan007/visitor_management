import { ConfiscatedItems } from './ConfiscatedItems'

export interface SecurityVerification2{
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
	/**	Employee ID : Data	*/
	employee?: string
	/**	Location : Data	*/
	location?: string
	/**	Date : Data	*/
	date?: string
	/**	Employee Name : Data	*/
	employee_name?: string
	/**	Time : Data	*/
	time?: string
	/**	Status : Data	*/
	status?: string
	/**	Laptop Image : Long Text	*/
	laptop_image?: string
	/**	Confiscated : Data	*/
	conf_list?: string
	/**	Returned : Data	*/
	returned_list?: string
	/**	Pending : Data	*/
	pending_list?: string
	/**	Confiscated Items : Long Text	*/
	image_list?: string
	/**	Items : Table - Confiscated Items	*/
	image_links?: ConfiscatedItems[]
	/**	Amended From : Link - Security Verification 2	*/
	amended_from?: string
	/**	Emp ID : Link - Employee	*/
	emp_id?: string
	/**	Amended From : Link - Security Verification 2	*/
	amended_from?: string
}