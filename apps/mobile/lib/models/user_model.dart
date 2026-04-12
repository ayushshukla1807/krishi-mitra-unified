import 'package:flutter/foundation.dart';

class User with ChangeNotifier {
  final String id;
  final String name;
  final String email;
  final String location;
  // Add other user profile fields as needed

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.location,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['_id'] as String,
      name: json['name'] as String,
      email: json['email'] as String,
      location: json['location'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'email': email,
      'location': location,
    };
  }
}