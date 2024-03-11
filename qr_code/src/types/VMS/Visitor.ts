
export interface Visitor{
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
	user_name: string
	/**	Address : Small Text	*/
	address: string
	/**	Employee ID : Link - Employee	*/
	visitor: string
	/**	E-mail : Data	*/
	email: string
	/**	In-Time : Time	*/
	in_time: string
	/**	Out-Time : Time	*/
	out_time?: string
	/**	Mobile : Data	*/
	to: string
	/**	Visitor Photo : Attach Image	*/
	snap_image: string
	/**	Amended From : Link - Visitor	*/
	amended_from?: string
}