from flask import request, jsonify
from flask_jwt_extended import create_access_token
import bcrypt
from app.models import users_collection
from app.utils.mail import send_reset_email
import secrets
from app.routes import auth_routes
from datetime import datetime , timedelta , time
from datetime import datetime, timedelta, timezone

# User Registration
@auth_routes.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if users_collection.find_one({"email": data["email"]}):
        return jsonify({"msg": "Email already registered"}), 409

    hashed_password = bcrypt.hashpw(data["password"].encode("utf-8"), bcrypt.gensalt())

    new_user = {
        "full_name": data["full_name"],
        "email": data["email"],
        "username": data["username"],
        "password": hashed_password,
    }

    users_collection.insert_one(new_user)
    return jsonify({"msg": "User registered successfully"}), 201

# User Login
@auth_routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    user = users_collection.find_one({"email": data["email"]})
    if not user:
        return jsonify({"msg": "User not found"}), 404

    if bcrypt.checkpw(data["password"].encode("utf-8"), user["password"]):
        access_token = create_access_token(identity=user["email"])
        return jsonify({"access_token": access_token}), 200

    return jsonify({"msg": "Incorrect password"}), 401

# Forgot Password
@auth_routes.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json()
    user = users_collection.find_one({"email": data["email"]})

    if not user:
        return jsonify({"msg": "User not found"}), 404

    reset_token = secrets.token_urlsafe(32)
    
    expiration_time = datetime.now(timezone.utc) + timedelta(minutes=10) 


    # Store reset token and expiry time
    users_collection.update_one(
        {"email": data["email"]},
        {"$set": {"reset_token": reset_token, "reset_token_expiry": expiration_time}}
    )

    send_reset_email(data["email"], reset_token)
    return jsonify({"msg": "Password reset email sent"}), 200


@auth_routes.route("/reset-password/<token>", methods=["POST"])
def reset_password(token):
    data = request.get_json()
    user = users_collection.find_one({"reset_token": token})

    if not user:
        return jsonify({"msg": "Invalid or expired token"}), 400

    # Check if token is expired
    if "reset_token_expiry" in user and datetime.utcnow() > user["reset_token_expiry"]:
        return jsonify({"msg": "Token expired"}), 400

    # Hash the new password
    hashed_password = bcrypt.hashpw(data["new_password"].encode("utf-8"), bcrypt.gensalt())

    # Update password and remove reset token
    users_collection.update_one(
        {"reset_token": token},
        {"$set": {"password": hashed_password}, "$unset": {"reset_token": "", "reset_token_expiry": ""}}
    )

    return jsonify({"msg": "Password updated successfully"}), 200
