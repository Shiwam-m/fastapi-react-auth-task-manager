from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    # DB_CONNECTION: str
    # SECRET_KEY: str 
    # ALGORITHM: str 
    # EXP_TIME: int 

    # If environment variable not, then default (khali) 
    DB_CONNECTION: str = "" 
    SECRET_KEY: str = "default_secret"
    ALGORITHM: str = "HS256"
    EXP_TIME: int = 30

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()