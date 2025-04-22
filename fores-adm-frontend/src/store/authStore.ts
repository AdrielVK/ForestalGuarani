import {create} from 'zustand';
import { /*ICreateUser,*/ ILogin, User } from '../models/interfaces/auth.interfaces';
import { api } from '../interceptors/axios.interceptor';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  fetchUserLoading: boolean
  reFetchUsers: boolean;
}

export type AuthActios = {
  login: (data:ILogin) => Promise<void>;
  logout: () => Promise<void>;
  fetchUserByToken: () => Promise<void>;
  //createUser: (data:ICreateUser) => Promise<void>;
  reFetchUserList: (value:boolean) => void
}

export type AuthStore = AuthState & AuthActios;

export const InitialState: AuthState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  fetchUserLoading: false,
  reFetchUsers: false,
}

export const useAuthStore = create<AuthStore>((set) => ({
  ...InitialState,
  
  login: async(data:ILogin) => {
    set({loading: true, isAuthenticated: false, user: null})
    try {
      const response = await api.post('auth/login', data);
      if(response.status === 201) {
        localStorage.setItem('token', response.data.payload.access_token);
        //SnackbarUtilities.success('Inicio de sesion exitoso');
        set({isAuthenticated:true})
      }
    } catch {
      set({isAuthenticated: false, user:null})
    } finally {
      set({ loading: false})
    }
  },

  reFetchUserList : (value:boolean) => {
    set({reFetchUsers:value})
  },

  logout: async () => {
    localStorage.removeItem('token')
    set({isAuthenticated:false, user:null})
  },

  fetchUserByToken: async () => {
    set({fetchUserLoading:true})
    try {
      const response = await api.get('auth/me');
      if (response.status === 200){
        const user:User = response.data
        set({isAuthenticated: true, user: user})
      }
     
    } catch {
      set({user:null, isAuthenticated:false})
      localStorage.removeItem('token')
    } finally {
      set({fetchUserLoading:false})
    }
  }

}))