
export interface OutTime{
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
	/**	Series : Select	*/
	naming_series?: "EXIT-.###"
	/**	Name : Data	*/
	user_name?: string
	/**	Mobile : Data	*/
	mobile?: string
	/**	Out Time : Data	*/
	out_time?: string
	/**	Amended From : Link - Out Time	*/
	amended_from?: string
}