class ApiService {
  private readonly baseUrl: string = 'http://localhost:3001/api';
  public bearerToken: string | null = null;

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
}

const apiService = new ApiService();

export default apiService;
