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
        title: Row(
          children: [
            Expanded(child: Text(user.name)),
            if (user.isVerified) const Icon(Icons.verified, color: Colors.blue, size: 18),
            if (user.isPremium) const Padding(padding: EdgeInsets.only(left: 6), child: Icon(Icons.workspace_premium, color: Colors.amber, size: 18)),
          ],
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('${user.college} • Match ${user.matchScore} • ⭐ ${user.ratingAverage.toStringAsFixed(1)}'),
            if (user.reasons.isNotEmpty) Text(user.reasons.take(2).join(' · '), maxLines: 2),
          ],
        ),
        trailing: const Icon(Icons.chevron_right),
        onTap: onTap,
      ),
    );
  }
}
