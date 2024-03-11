from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in visitor_management/__init__.py
from visitor_management import __version__ as version

setup(
	name="visitor_management",
	version=version,
	description="Visitor Management System @ Agnikul Cosmos",
	author="Agnikul Cosmos Private Limited",
	author_email="lakshmi_narashimman@agnikul.in",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
