class UserProfile {
  final String id;
  final String name;
  final String college;
  final String avatarUrl;
  final double ratingAverage;
  final int matchScore;
  final bool isVerified;
  final bool isPremium;
  final List<String> reasons;

  UserProfile({
    required this.id,
    required this.name,
    required this.college,
    required this.avatarUrl,
    required this.ratingAverage,
    required this.matchScore,
    required this.isVerified,
    required this.isPremium,
    required this.reasons,
  });

  factory UserProfile.fromJson(Map<String, dynamic> json) => UserProfile(
        id: json['_id'] ?? json['id'],
        name: json['name'] ?? '',
        college: json['college'] ?? '',
        avatarUrl: json['avatarUrl'] ?? '',
        ratingAverage: (json['ratingAverage'] ?? 0).toDouble(),
        matchScore: json['matchScore'] ?? 0,
        isVerified: json['isVerified'] ?? false,
        isPremium: json['isPremium'] ?? false,
        reasons: (json['reasons'] as List? ?? []).map((e) => e.toString()).toList(),
      );
}
