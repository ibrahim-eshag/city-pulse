type AccountType = {
  account_type_id: number;
  account_type_name: string;
  account_type_name_ar: string;
  account_type_name_en: string;
};

type Account = {
  account_id: string;
  date_of_birth: string | null;
  email: string | null;
  full_name: string | null;
  gender: number | null;
  mobile: string;
};

export { Account, AccountType };
