class AuthState {
  final String? userId;
  final bool loading;
  const AuthState({this.userId, this.loading = false});
  bool get isLoggedIn => userId != null;
  AuthState copyWith({String? userId, bool? loading}) => AuthState(userId: userId ?? this.userId, loading: loading ?? this.loading);
}
