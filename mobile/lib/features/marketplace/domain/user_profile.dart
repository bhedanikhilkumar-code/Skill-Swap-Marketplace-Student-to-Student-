class UserProfile {
  final String id;
  final String name;
  final String college;
  final String avatarUrl;
  final double ratingAverage;
  final int matchScore;

  UserProfile({required this.id, required this.name, required this.college, required this.avatarUrl, required this.ratingAverage, required this.matchScore});

  factory UserProfile.fromJson(Map<String, dynamic> json) => UserProfile(
        id: json['_id'] ?? json['id'],
        name: json['name'] ?? '',
        college: json['college'] ?? '',
        avatarUrl: json['avatarUrl'] ?? '',
        ratingAverage: (json['ratingAverage'] ?? 0).toDouble(),
        matchScore: json['matchScore'] ?? 0,
      );
}
