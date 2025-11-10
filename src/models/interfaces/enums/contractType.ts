export enum ContractType {
    cdi = "Cdi",
    cdd = "Cdd",
    sivp = "Sivp",
    apprenti = "Apprenti"
}

export const contract_types = [
    { value: null, view_value: "No contract" },
    { value: ContractType.cdi, view_value: "cdi" },
    { value: ContractType.cdd, view_value: "cdd" },
    { value: ContractType.sivp, view_value: "sivp" },
    { value: ContractType.apprenti, view_value: "apprenti" },
];