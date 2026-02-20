class AuthState {
  final String? userId;
  final String role;
  final bool loading;
  const AuthState({this.userId, this.role = 'USER', this.loading = false});
  bool get isLoggedIn => userId != null;
  bool get isAdmin => role == 'ADMIN';
  AuthState copyWith({String? userId, String? role, bool? loading}) =>
      AuthState(userId: userId ?? this.userId, role: role ?? this.role, loading: loading ?? this.loading);
}
