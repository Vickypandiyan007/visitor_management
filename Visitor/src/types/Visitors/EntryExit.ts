
export interface EntryExit{
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
	/**	Name : Data	*/
	user_name?: string
	/**	Email : Data	*/
	email?: string
	/**	Address : Data	*/
	address?: string
	/**	In-Time : Data	*/
	in_time?: string
	/**	Employee Name : Data	*/
	employee_name?: string
	/**	Company : Data	*/
	company?: string
	/**	Mobile : Data	*/
	mobile?: string
	/**	Purpose of Visit : Data	*/
	purpose_of_visit?: string
	/**	Image : Attach Image	*/
	image?: string
	/**	Amended From : Link - Entry Exit	*/
	amended_from?: string
}