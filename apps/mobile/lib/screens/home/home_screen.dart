import 'package:flutter/material.dart';
import '../../providers/auth_provider.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatelessWidget {
  static const routeName = '/home';

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context, listen: false);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Krishi Mitra Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.exit_to_app),
            onPressed: () {
              auth.logout();
              Navigator.of(context).pushReplacementNamed('/login'); // Go back to login
            },
          ),
        ],
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(
              decoration: BoxDecoration(
                color: Theme.of(context).primaryColor,
              ),
              child: const Text(
                'Krishi Mitra',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                ),
              ),
            ),
            ListTile(
              leading: const Icon(Icons.home),
              title: const Text('Home'),
              onTap: () {
                Navigator.pop(context);
                // Already on home
              },
            ),
            ListTile(
              leading: const Icon(Icons.agriculture),
              title: const Text('My Crops'),
              onTap: () {
                Navigator.pop(context);
                // Navigate to Crop Management
              },
            ),
            ListTile(
              leading: const Icon(Icons.cloud_queue),
              title: const Text('Weather Forecast'),
              onTap: () {
                Navigator.pop(context);
                // Navigate to Weather Screen
              },
            ),
            ListTile(
              leading: const Icon(Icons.bug_report),
              title: const Text('Pest & Disease Detection'),
              onTap: () {
                Navigator.pop(context);
                // Navigate to Pest Detection Screen
              },
            ),
            ListTile(
              leading: const Icon(Icons.leaderboard),
              title: const Text('Market Prices'),
              onTap: () {
                Navigator.pop(context);
                // Navigate to Market Prices Screen
              },
            ),
            ListTile(
              leading: const Icon(Icons.people),
              title: const Text('Community Forum'),
              onTap: () {
                Navigator.pop(context);
                // Navigate to Community Forum Screen
              },
            ),
            ListTile(
              leading: const Icon(Icons.settings),
              title: const Text('Settings'),
              onTap: () {
                Navigator.pop(context);
                // Navigate to Settings Screen
              },
            ),
          ],
        ),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Welcome to Krishi Mitra!', style: Theme.of(context).textTheme.headlineMedium),
            const SizedBox(height: 20),
            Text('Your personalized farm dashboard awaits.', style: Theme.of(context).textTheme.titleMedium),
            // Here you'd integrate widgets for weather, alerts, crop summaries etc.
          ],
        ),
      ),
    );
  }
}