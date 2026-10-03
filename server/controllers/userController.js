const User = require('../models/User');

// Update user onboarding preferences
exports.updateOnboarding = async (req, res) => {
  try {
    const { id } = req.params;
    const { preferences, learningGoal } = req.body;

    // Ensure the user updating the profile is the authenticated user or an admin
    if (req.user.id !== id && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Unauthorized to update this user' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { preferences, learningGoal } },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Onboarding preferences updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
