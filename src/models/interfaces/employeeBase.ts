import { ContractType } from "./enums/contractType"
import { Gender } from "./enums/gender"
import { Role } from "./enums/role"
import { ListResponse } from "./listResponse"

export interface EmployeeBase {
    first_name: string
    last_name: string
    email: string
    number: number
    birth_date: string | undefined
    address: string | undefined
    cnss_number: string | undefined
    contract_type: ContractType
    gender: Gender
    roles: ListResponse<Role>
    phone_number: string | undefined
}