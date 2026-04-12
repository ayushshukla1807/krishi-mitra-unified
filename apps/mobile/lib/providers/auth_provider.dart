import 'package:flutter/material.dart';

class AuthProvider with ChangeNotifier {
  // This would hold user authentication state
  String? _token;
  String? _userId;
  DateTime? _expiryDate;

  bool get isAuth {
    return token != null;
  }

  String? get token {
    if (_expiryDate != null && _expiryDate!.isAfter(DateTime.now()) && _token != null) {
      return _token;
    }
    return null;
  }

  Future<void> login(String email, String password) async {
    // Simulate API call to backend
    print('Attempting to log in $email...');
    await Future.delayed(Duration(seconds: 1)); // Simulate network request
    _token = 'dummy_jwt_token'; // Replace with actual token from API
    _userId = 'dummy_user_id';
    _expiryDate = DateTime.now().add(Duration(hours: 1)); // Token expires in 1 hour
    notifyListeners();
    print('Login successful (simulated)!');
  }

  Future<void> signup(String name, String email, String password, String location) async {
    // Simulate API call to backend
    print('Attempting to sign up $name ($email)...');
    await Future.delayed(Duration(seconds: 1));
    // After successful signup, you might auto-login or redirect to login
    print('Signup successful (simulated)!');
  }

  void logout() {
    _token = null;
    _userId = null;
    _expiryDate = null;
    notifyListeners();
    print('Logged out.');
  }
}