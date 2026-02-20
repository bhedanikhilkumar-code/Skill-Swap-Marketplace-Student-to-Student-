import 'package:flutter/material.dart';
import '../../features/marketplace/domain/user_profile.dart';

class UserCard extends StatelessWidget {
  final UserProfile user;
  final VoidCallback onTap;
  const UserCard({super.key, required this.user, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: CircleAvatar(backgroundImage: user.avatarUrl.isNotEmpty ? NetworkImage(user.avatarUrl) : null, child: user.avatarUrl.isEmpty ? Text(user.name[0]) : null),
        title: Text(user.name),
        subtitle: Text('${user.college} • Match ${user.matchScore} • ⭐ ${user.ratingAverage.toStringAsFixed(1)}'),
        trailing: const Icon(Icons.chevron_right),
        onTap: onTap,
      ),
    );
  }
}
