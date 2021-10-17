#!/usr/bin/python3
import argparse
import os
import sys
from subprocess import Popen

parser = argparse.ArgumentParser('dodobox')
subparsers = parser.add_subparsers(help='Action to perform', dest='action', required=True)
actions = {}


def action(name, help=None, **kwargs):
    p = subparsers.add_parser(name, help=help, **kwargs)

    def decorator(cls):
        actions[name] = action = cls()
        action.configure(p)
        return cls

    return decorator


class Command:
    def configure(self, parser):
        pass

    def run(self, config):
        raise NotImplementedError


class ProcessCommand(Command):
    def run(self, *args):
        return Popen(args).wait()


@action('build', help='Build the dev environnement with docker compose.')
class ComposeBuild(ProcessCommand):
    def run(self, config):
        return super(ComposeBuild, self).run('docker-compose', '-p', config.project, 'build')


@action('up', help='Starts the dev environnement with docker compose.')
class ComposeUp(ProcessCommand):
    def configure(self, parser):
        parser.add_argument('-f', action='store_true', help='Run in foreground.', dest='foreground')

    def run(self, config):
        args = []
        if not config.foreground:
            args = ['-d']

        return super().run('docker-compose', '-p', config.project, 'up', *args)


@action('down', help='Stops the dev environnement.')
class ComposeDown(ProcessCommand):
    def configure(self, parser):
        parser.add_argument('-t', type=int, help='Specify a shutdown timeout in seconds.', dest='timeout')

    def run(self, config):
        args = []
        if config.timeout:
            args = ['-t', config.timeout]

        return super().run('docker-compose', '-p', config.project, 'down', *args)


@action('restart', help='Restart the dev environnement.')
class ComposeRestart(ProcessCommand):
    def configure(self, parser):
        parser.add_argument('-t', type=int, help='Specify a shutdown timeout in seconds.', dest='timeout')

    def run(self, config):
        args = []
        if config.timeout:
            args = ['-t', config.timeout]

        return super().run('docker-compose', '-p', config.project, 'restart', *args)


@action('upgrade', help='Upgrade the database using Alembic.')
class AlembicUpgrade(ProcessCommand):
    def run(self, config):
        args = ['-T', '--workdir', '/api', 'api', 'alembic', 'upgrade', 'head']
        return super().run('docker-compose', '-p', config.project, 'exec', *args)


@action('downgrade', help='Downgrade the database using Alembic.')
class AlembicDowngrade(ProcessCommand):
    def run(self, config):
        args = ['-T', '--workdir', '/api', 'api', 'alembic', 'downgrade', '-1']
        return super().run('docker-compose', '-p', config.project, 'exec', *args)


@action('revision', help='Create a new revision of the database.')
class AlembicRevision(ProcessCommand):
    def configure(self, parser):
        parser.add_argument('message', help='Specify a name for the revision.')

    def run(self, config):
        args = ['/api', 'api', 'alembic', 'revision', '--autogenerate', '-m', config.message]
        result = super().run('docker-compose', '-p', config.project, 'exec', '--workdir', *args)
        args = ['/api/alembic/versions', 'api', 'chown', '-R', str(os.getuid()), '.']
        super().run('docker-compose', '-p', config.project, 'exec', '--workdir', *args)
        return result


if __name__ == '__main__':
    parser.add_argument('-p', help='Name of project to use with docker-compose.', dest='project', default='dodobox')

    args = parser.parse_args()
    sys.exit(actions[args.action].run(args))
