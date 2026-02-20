import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/api_client.dart';

final reviewsRepositoryProvider = Provider((ref) => ReviewsRepository());

class ReviewsRepository {
  Future<List<dynamic>> userReviews(String userId) async {
    final c = await ApiClient.create();
    final res = await c.dio.get('/reviews/user/$userId');
    return res.data['data'];
  }
}
