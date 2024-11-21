import {cookieManager} from "@/service/cookie.service";

class ApiService {
  private readonly baseUrl: string = 'http://localhost:3001/api';
  public bearerToken: string | null = null;

  constructor() {
    this.getToken();
  }

  private getToken(): string {
    this.bearerToken = cookieManager.getCookie('token');
  }

  public async register(data: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }): Promise<void> {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to register user');
    }

    return response.json();
  }

  public async login(data: {
    email: string;
    password: string;
  }): Promise<void> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to login user');
    }

    return response.json();
  }

  public async getCategories(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/items-categories`, {
      headers: {
        "authorization": `${this.bearerToken}`,
      },
    });
    return await response.json();
  }

  public async createItem(data: {
    name: string;
    description: string;
    price: number;
    category: string;
    files: File[];
  }): Promise<void> {
    const response = await fetch(`${this.baseUrl}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "authorization": `${this.bearerToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create item');
    }

    return response.json();
  }

  public async getItems(pagination: number): Promise<Items[] | void> {
    try {
      const response = await fetch(`${this.baseUrl}/items?pagination=${pagination}`, {
        headers: {
          "authorization": `${this.bearerToken}`,
        },
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to get items');
    }
  }
}

const apiService = new ApiService();

export default apiService;
