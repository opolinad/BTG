from flask import Blueprint

from . import fund, user

bp = Blueprint('index', __name__)
bp.register_blueprint(fund.bp)
bp.register_blueprint(user.bp)
