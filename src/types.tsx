export interface Department {
  id: number;
  department: string;
  description?: string;
}

export interface Position {
  id: number;
  title: string;
  description?: string;
  department?: Department;
}

export interface EmployeeM {
  firstName: string,
  lastName: string,
  birthdate: string,
  cpf: string,
  rg: string,
  email: string,
  phone: string,
  department: string,
  position: string,
  hireDate:  string

}

export interface DashboardData {
  totalEmployees: number;
  pendingVacations: number;
  birthdays: number;
}

export interface Position {
  id: number;
  title: string;
  positionDescription: string;
}

export interface Document {
  id: number;
  employee_id: number;
  name: string;
  type: string;      // Ex: 'pdf'
  path: string;      // Caminho relativo para acessar o arquivo na storage
  created_at?: string | null;
  updated_at?: string | null;
}


export interface LaborRights {
  contract_type: string;
  workload: string;
  is_unionized: boolean;
  has_fgts: boolean;
  has_inss: boolean;
  has_13th: boolean;
  has_vacation: boolean;
  transport: boolean;
  meal_voucher: boolean;
  food_voucher: boolean;
}

export interface Incident {
  id: number;
  type: string;
  description: string;
  date: string;
  severity: 'low' | 'medium' | 'high';
}


export interface Tag {
  id: number;
  content: string;
  color: string;
  employee_id: number;
}

export interface Salary {
  id: number;
  amount: string;
  start_date: string;
  end_date: string | null;
}

export interface Leave {
  id: number;
  type: string;
  reason: string;
  start_date: string;
  end_date: string;
  status: string;
}

export interface Report {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  hire_date: string;
  absences?: Absence[];
  cpf: string;
  rg?: string;
  phone?: string;
  description?: string;
  city?: string;
  position_id: number;
  employment_status: 'active' | 'on_leave' | 'terminated';
  position?: Position;
  documents?: Document[];
  labor_rights?: LaborRights;
  tags?: Tag[];
  salaries?: Salary[];
  leaves?: Leave[];
  reports?: Report[];
  incidents?: Incident[];
  attendances: Attendance[];
  termination_date?: string;
  termination_type?: 'without_cause' | 'resignation' | 'with_cause';
  termination_reason?: string;
  severance_amount: string;
  notice_paid: boolean;
}

export interface PayRoll {
  employee_id: number;
  employee_name: string;
  position: string;
  days: number;
  hours: number;
  desconts: number;
  salary: number;
  fouls: Leave[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    logout: () => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export interface Attendance {
  id: number;
  date: string;
  status: string;
}

export interface Absence {
  id: number;
  date: string;
  reason: string;
}

export interface ChecklistTask {
  id: number;
  checklist_template_id: number;
  title: string;
  is_required: boolean;
}

export interface ChecklistTemplate {
  id: number;
  name: string;
  description: string;
  tasks: ChecklistTask[];
}

export interface EmployeeChecklist {
  id: number;
  employee_id: number;
  template_id: number;
  status: 'in_progress' | 'completed' | 'pending';
  progress: number; // 0-100
  template: {
    id: number;
    name: string;
  };
}

export interface ChecklistItem {
  completed: boolean | undefined;
  id: number;
  title: string;
  is_completed: boolean;
  template_item?: {
    name: string;
    description: string;
  };
}


export interface DetailedEmployeeChecklist {
  id: number;
  template: {
    name: string;
  };
  items: ChecklistItem[];
}

export interface SeveranceData {
  salary_balance: number;
  expired_vacation: number;
  proportional_vacation: number;
  constitutional_third: number;
  thirteenth_salary: number;
  prior_notice: number;
  total: number;
}