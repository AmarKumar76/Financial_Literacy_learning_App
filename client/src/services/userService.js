import api from './api';

export const submitOnboarding = async (userId, data) => {
  const response = await api.patch(`/users/${userId}/onboarding`, data);
  return response.data;
};
