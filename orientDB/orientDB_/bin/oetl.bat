@echo off
rem
rem Copyright (c) 2014 Luca Garulli @www.orientechnologies.com
rem
rem Guess ORIENTDB_HOME if not defined
set CURRENT_DIR=%cd%

if exist "%JAVA_HOME%\bin\java.exe" goto setJavaHome
set JAVA="java"
goto okJava

:setJavaHome
set JAVA="%JAVA_HOME%\bin\java"

:okJava
if not "%ORIENTDB_HOME%" == "" goto gotHome
set ORIENTDB_HOME=%CURRENT_DIR%
if exist "%ORIENTDB_HOME%\bin\oetl.bat" goto okHome
cd ..
set ORIENTDB_HOME=%cd%
cd %CURRENT_DIR%

:gotHome
if exist "%ORIENTDB_HOME%\bin\oetl.bat" goto okHome
echo The ORIENTDB_HOME environment variable is not defined correctly
echo This environment variable is needed to run this program
goto end

:okHome
rem Get the command line arguments and save them in the
set CMD_LINE_ARGS=%*

if NOT exist "%CONFIG_FILE%" set CONFIG_FILE=%ORIENTDB_HOME%/config/orientdb-etl-config.xml


set KEYSTORE=%ORIENTDB_HOME%\config\cert\orientdb-console.ks
set KEYSTORE_PASS=password
set TRUSTSTORE=%ORIENTDB_HOME%\config\cert\orientdb-console.ts
set TRUSTSTORE_PASS=password
set SSL_OPTS="-Dclient.ssl.enabled=false -Djavax.net.ssl.keyStore=%KEYSTORE% -Djavax.net.ssl.keyStorePassword=%KEYSTORE_PASS% -Djavax.net.ssl.trustStore=%TRUSTSTORE% -Djavax.net.ssl.trustStorePassword=%TRUSTSTORE_PASS%"

set ORIENTDB_SETTINGS=-Xmx512m -Djava.util.logging.config.file="%ORIENTDB_HOME%\config\orientdb-client-log.properties" -Djava.awt.headless=true
call %JAVA% -server %SSL_OPTS% %ORIENTDB_SETTINGS% -Djava.util.logging.config.file="%LOG_FILE%" -Dfile.encoding=utf-8 -Dorientdb.build.number="3.0.x@rb89d566f96b4632bc56422887d7f249e5c2ce23f; 2018-12-10 15:04:49+0000" -cp "%ORIENTDB_HOME%\lib\*;%ORIENTDB_HOME%\plugins\*" com.orientechnologies.orient.etl.OETLProcessor %CMD_LINE_ARGS%

:end
