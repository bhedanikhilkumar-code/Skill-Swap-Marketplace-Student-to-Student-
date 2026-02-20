import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/api_client.dart';
import '../domain/user_profile.dart';

final marketplaceRepositoryProvider = Provider((ref) => MarketplaceRepository());

class MarketplaceRepository {
  Future<List<UserProfile>> fetchUsers({String? skillTag, String? college}) async {
    final c = await ApiClient.create();
    final res = await c.dio.get('/users/search', queryParameters: {'skillTag': skillTag, 'college': college, 'page': 1, 'limit': 20});
    return (res.data['data']['items'] as List).map((e) => UserProfile.fromJson(e)).toList();
  }

  Future<List<UserProfile>> fetchRecommended() async {
    final c = await ApiClient.create();
    final res = await c.dio.get('/users/recommended', queryParameters: {'page': 1, 'limit': 20});
    return (res.data['data']['items'] as List).map((e) => UserProfile.fromJson(e)).toList();
  }
}
